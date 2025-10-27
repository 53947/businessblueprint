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
  private algorithm: 'RS256' | 'HS256'; // Allow HS256 as well

  constructor() {
    this.keyPair = this.generateKeyPair();
    // Determine algorithm based on key availability
    this.algorithm = this.keyPair.privateKey && this.keyPair.publicKey ? 'RS256' : 'HS256';
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

    // If RSA keys are not configured, we won't generate them here.
    // The HS256 algorithm will be used with JWT_SECRET or a fallback.
    // However, if we were to generate keys, this is how it would be done:
    /*
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
    console.log('⚠️ WARNING: Using ephemeral keys. Set JWT_PRIVATE_KEY and JWT_PUBLIC_KEY environment variables for production.');

    return { publicKey, privateKey };
    */

    // Return empty keys if not found, indicating HS256 will be used
    return { publicKey: '', privateKey: '' };
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
      expiresIn: '24h' // 24 hour token expiration
    };

    // Use appropriate key or secret for signing
    const signingKey = this.algorithm === 'RS256' ? this.keyPair.privateKey : process.env.JWT_SECRET || 'fallback-secret-key';

    const token = jwt.sign(payload, signingKey, options);

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
      const options: jwt.VerifyOptions = {
        algorithms: [this.algorithm],
        issuer: 'businessblueprint.io',
        audience: 'client-portal'
      };

      // Use appropriate key or secret for verification
      const verificationKey = this.algorithm === 'RS256' ? this.keyPair.publicKey : process.env.JWT_SECRET || 'fallback-secret-key';

      const decoded = jwt.verify(token, verificationKey, options) as JWTPayload;

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
    // Return public key if available, otherwise null or an indicator for HS256
    return this.keyPair.publicKey || '';
  }

  /**
   * Get JWK (JSON Web Key) for public key distribution
   */
  getJWK(): object | null {
    if (this.algorithm === 'RS256' && this.keyPair.publicKey) {
      const publicKey = crypto.createPublicKey(this.keyPair.publicKey);
      const jwk = publicKey.export({ format: 'jwk' });

      return {
        ...jwk,
        alg: this.algorithm,
        use: 'sig',
        kid: crypto.createHash('sha256').update(this.keyPair.publicKey).digest('hex').substring(0, 16)
      };
    }
    // Return null or an empty object if not using RS256 or keys are not available
    return null;
  }

}

export const jwtService = new JWTService();