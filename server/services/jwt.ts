import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { db } from "../db";
import { dashboardAccess } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface JWTPayload {
  clientId: number;
  externalId?: string;
  permissions: string[];
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export class JWTService {
  private keyPair: KeyPair;
  private algorithm: 'RS256' = 'RS256';

  constructor() {
    this.keyPair = this.generateKeyPair();
  }

  /**
   * Generate RSA key pair for JWT signing
   */
  private generateKeyPair(): KeyPair {
    // Check if keys exist in environment variables
    const existingPrivateKey = process.env.JWT_PRIVATE_KEY;
    const existingPublicKey = process.env.JWT_PUBLIC_KEY;

    if (existingPrivateKey && existingPublicKey) {
      return {
        privateKey: existingPrivateKey.replace(/\\n/g, '\n'),
        publicKey: existingPublicKey.replace(/\\n/g, '\n')
      };
    }

    // Generate new RSA key pair
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });

    console.log('Generated new RSA key pair for JWT signing');
    console.log('Consider storing these keys in environment variables:');
    console.log('JWT_PRIVATE_KEY:', privateKey.replace(/\n/g, '\\n'));
    console.log('JWT_PUBLIC_KEY:', publicKey.replace(/\n/g, '\\n'));

    return { publicKey, privateKey };
  }

  /**
   * Create a secure dashboard access token for a client
   */
  async createDashboardToken(clientId: number, externalId?: string): Promise<string> {
    const payload: JWTPayload = {
      clientId,
      externalId,
      permissions: ['dashboard:read', 'dashboard:write', 'campaigns:read', 'messages:read'],
      iss: 'businessblueprint.io',
      aud: 'client-portal'
    };

    const options: jwt.SignOptions = {
      algorithm: this.algorithm,
      expiresIn: '24h', // 24 hour token expiration
      issuer: 'businessblueprint.io',
      audience: 'client-portal'
    };

    const token = jwt.sign(payload, this.keyPair.privateKey, options);

    // Store token in database for tracking
    await db.insert(dashboardAccess).values({
      clientId,
      accessToken: token,
      dashboardUrl: `/portal?token=${token}`,
      isActive: true
    });

    return token;
  }

  /**
   * Verify and decode a JWT token
   */
  verifyToken(token: string): JWTPayload {
    try {
      const decoded = jwt.verify(token, this.keyPair.publicKey, {
        algorithms: [this.algorithm],
        issuer: 'businessblueprint.io',
        audience: 'client-portal'
      }) as JWTPayload;

      return decoded;
    } catch (error) {
      throw new Error(`Invalid token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Refresh a token (create new token with extended expiration)
   */
  async refreshToken(oldToken: string): Promise<string> {
    try {
      const decoded = this.verifyToken(oldToken);
      
      // Create new token with same payload but fresh expiration
      const newToken = await this.createDashboardToken(decoded.clientId, decoded.externalId);
      
      // Deactivate old token
      await this.revokeToken(oldToken);
      
      return newToken;
    } catch (error) {
      throw new Error(`Cannot refresh token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Revoke a token (mark as inactive in database)
   */
  async revokeToken(token: string): Promise<void> {
    await db
      .update(dashboardAccess)
      .set({ isActive: false })
      .where(eq(dashboardAccess.accessToken, token));
  }

  /**
   * Check if token is active in database
   */
  async isTokenActive(token: string): Promise<boolean> {
    const [record] = await db
      .select()
      .from(dashboardAccess)
      .where(eq(dashboardAccess.accessToken, token));

    return record?.isActive || false;
  }

  /**
   * Get public key for external verification
   */
  getPublicKey(): string {
    return this.keyPair.publicKey;
  }

  /**
   * Get JWK (JSON Web Key) for public key distribution
   */
  getJWK(): object {
    const publicKey = crypto.createPublicKey(this.keyPair.publicKey);
    const jwk = publicKey.export({ format: 'jwk' });
    
    return {
      ...jwk,
      alg: this.algorithm,
      use: 'sig',
      kid: crypto.createHash('sha256').update(this.keyPair.publicKey).digest('hex').substring(0, 16)
    };
  }

}

export const jwtService = new JWTService();