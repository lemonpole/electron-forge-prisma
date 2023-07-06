/**
 * Seeds the database with continents
 * and their related countries data.
 *
 * @module
 */
import log from 'electron-log';
import { PrismaClient } from '@prisma/client';
import { countries, continents } from 'countries-list';
import { groupBy } from 'lodash';

/** @type {CountryCode} */
type CountryCode = keyof typeof countries;

/** @type {ContinentCode} */
type ContinentCode = keyof typeof continents;

/**
 * The main seeder.
 *
 * @function
 * @param prisma The prisma client.
 */
export default async function (prisma: PrismaClient) {
  // bail if we have continents and countries
  const continentsCount = await prisma.continent.count();
  const countriesCount = await prisma.country.count();

  if (continentsCount > 0 || countriesCount > 0) {
    log.warn('Continents and Countries already populated. Skipping.');
    return Promise.resolve();
  }

  // append code to country object
  const countryCodes = Object.keys(countries).map((code: CountryCode) => ({
    code,
    ...countries[code],
  }));

  // group countries by continent
  const continentCountries = groupBy(countryCodes, 'continent');

  // build the transaction
  const queries = Object.keys(continents)
    .map((code: ContinentCode) => ({
      data: {
        code,
        name: continents[code],
        countries: {
          create: continentCountries[code].map((country) => ({
            name: country.name,
            code: country.code,
          })),
        },
      },
      include: {
        countries: true,
      },
    }))
    .map((item) => prisma.continent.create(item));

  // run the transaction
  return prisma.$transaction(queries);
}
