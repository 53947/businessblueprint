import { BaseListingAdapter } from "./baseListingAdapter";
import { FoursquareAdapter } from "./adapters/foursquareAdapter";
import { NeustarAdapter } from "./adapters/neustarAdapter";
import { DataAxleAdapter } from "./adapters/dataAxleAdapter";
import { AcxiomAdapter } from "./adapters/acxiomAdapter";
import { GbpListingAdapter } from "./adapters/gbpListingAdapter";
import { FacebookListingAdapter } from "./adapters/facebookListingAdapter";
import { BingPlacesAdapter } from "./adapters/bingPlacesAdapter";
import { AppleConnectAdapter } from "./adapters/appleConnectAdapter";

/**
 * Factory for listing distribution adapters.
 * Lazy-creates singleton instances and provides lookup helpers.
 */

const adapterInstances = new Map<string, BaseListingAdapter>();

const adapterConstructors: Record<string, () => BaseListingAdapter> = {
  foursquare: () => new FoursquareAdapter(),
  neustar: () => new NeustarAdapter(),
  data_axle: () => new DataAxleAdapter(),
  acxiom: () => new AcxiomAdapter(),
  gbp: () => new GbpListingAdapter(),
  facebook: () => new FacebookListingAdapter(),
  bing: () => new BingPlacesAdapter(),
  apple: () => new AppleConnectAdapter(),
};

export function getAdapter(key: string): BaseListingAdapter | null {
  if (!adapterConstructors[key]) return null;

  if (!adapterInstances.has(key)) {
    adapterInstances.set(key, adapterConstructors[key]());
  }
  return adapterInstances.get(key)!;
}

export function getConfiguredAdapters(): BaseListingAdapter[] {
  return Object.keys(adapterConstructors)
    .map((key) => getAdapter(key)!)
    .filter((adapter) => adapter.isConfigured());
}

export function getAllAdapters(): BaseListingAdapter[] {
  return Object.keys(adapterConstructors).map((key) => getAdapter(key)!);
}

export function getDirectoryCoverage(): Record<string, string[]> {
  const coverage: Record<string, string[]> = {};
  for (const key of Object.keys(adapterConstructors)) {
    const adapter = getAdapter(key)!;
    coverage[key] = adapter.getDownstreamDirectories();
  }
  return coverage;
}

export function getTotalDirectoryCount(): number {
  const seen = new Set<string>();
  for (const key of Object.keys(adapterConstructors)) {
    const adapter = getAdapter(key)!;
    adapter.getDownstreamDirectories().forEach((d) => seen.add(d));
  }
  return seen.size;
}

export function getAdapterKeys(): string[] {
  return Object.keys(adapterConstructors);
}
