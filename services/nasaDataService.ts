
import { NasaMetadata, SoilMoistureRecord } from '../types';

const parseMetadata = (xmlText: string): NasaMetadata => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "application/xml");
  
  const getVal = (tag: string) => xmlDoc.getElementsByTagName(tag)[0]?.textContent ?? '';

  return {
    west: parseFloat(getVal('WestBoundingCoordinate')),
    east: parseFloat(getVal('EastBoundingCoordinate')),
    north: parseFloat(getVal('NorthBoundingCoordinate')),
    south: parseFloat(getVal('SouthBoundingCoordinate')),
    startDate: getVal('RangeBeginningDate'),
    endDate: getVal('RangeEndingDate'),
  };
};

const parseSoilData = (csvText: string): SoilMoistureRecord[] => {
  const lines = csvText.split('\n').slice(1); // Skip header
  const records: SoilMoistureRecord[] = [];
  
  for (const line of lines) {
    if (line.trim() === '') continue;
    const parts = line.split(',');
    const record: SoilMoistureRecord = {
      siteId: parts[2],
      date: parts[1],
      moisture: parseFloat(parts[3]),
    };
    records.push(record);
  }
  
  // Average the data for sites with multiple measurements
  const siteDataMap = new Map<string, { totalMoisture: number, count: number, date: string }>();
  for(const record of records) {
      if(!siteDataMap.has(record.siteId)) {
          siteDataMap.set(record.siteId, { totalMoisture: 0, count: 0, date: record.date });
      }
      const existing = siteDataMap.get(record.siteId)!;
      existing.totalMoisture += record.moisture;
      existing.count++;
  }

  const averagedRecords: SoilMoistureRecord[] = [];
  for(const [siteId, data] of siteDataMap.entries()) {
      averagedRecords.push({
          siteId,
          date: data.date,
          moisture: data.totalMoisture / data.count,
      });
  }

  return averagedRecords;
};

export const loadDroughtData = async () => {
  // Fetch the data files from the public folder
  const [metaResponse, soilDataResponse] = await Promise.all([
    fetch('/data/drought_metadata.xml'),
    fetch('/data/drought_data.csv'),
  ]);

  if (!metaResponse.ok || !soilDataResponse.ok) {
    throw new Error('Failed to fetch NASA simulation data.');
  }

  const metaText = await metaResponse.text();
  const soilDataText = await soilDataResponse.text();

  const metadata = parseMetadata(metaText);
  const records = parseSoilData(soilDataText);
  
  return { metadata, records };
};

export const loadFloodData = async () => {
  const response = await fetch('/data/flood_data.txt');
  if (!response.ok) {
    throw new Error('Failed to fetch NASA flood simulation data.');
  }
  const text = await response.text();
  const lines = text.split('\n').slice(1); // Skip header
  const records = lines.map((line, index) => {
    const parts = line.trim().split(/\s+/);
    return {
      id: `flood-site-${index}`,
      lat: parseFloat(parts[1]),
      long: parseFloat(parts[2]),
      rainfall: parseFloat(parts[3]),
    };
  }).filter(r => !isNaN(r.rainfall)); // Filter out any potential empty lines

  return { records };
};
