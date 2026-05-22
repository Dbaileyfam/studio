/** US states, DC, and territories for Musician Roster location. */
export const ROSTER_STATE_OPTIONS = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "Puerto Rico",
  "Guam",
  "U.S. Virgin Islands",
  "American Samoa",
  "Northern Mariana Islands"
] as const;

export type RosterState = (typeof ROSTER_STATE_OPTIONS)[number];

export const UTAH_TERRITORY_OPTIONS = [
  "Sandy",
  "Salt Lake City",
  "West Valley",
  "Murray",
  "Draper",
  "Provo",
  "Orem",
  "Lehi",
  "Ogden",
  "Layton",
  "Park City",
  "Other"
] as const;

export const OTHER_TERRITORY = "Other";

/** @deprecated Use OTHER_TERRITORY — legacy submissions used this label. */
export const LEGACY_OTHER_UTAH = "Other Utah";

const TERRITORIES_BY_STATE: Record<string, readonly string[]> = {
  "Alabama": ["Birmingham","Huntsville","Mobile","Montgomery","Tuscaloosa","Statewide","Other"],
  "Alaska": ["Anchorage","Fairbanks","Juneau","Mat-Su / Kenai","Statewide","Other"],
  "Arizona": ["Phoenix metro","Tucson","Flagstaff","Yuma","Statewide","Other"],
  "Arkansas": ["Little Rock","Northwest Arkansas","Fayetteville","Fort Smith","Statewide","Other"],
  "California": ["Los Angeles","San Francisco Bay Area","San Diego","Sacramento","Inland Empire","Central Valley","Fresno / Bakersfield","Statewide","Other"],
  "Colorado": ["Denver metro","Colorado Springs","Fort Collins / Northern CO","Mountain / resort towns","Statewide","Other"],
  "Connecticut": ["Hartford","New Haven","Bridgeport / Stamford","Eastern CT","Statewide","Other"],
  "Delaware": ["Wilmington","Dover","Sussex County","Statewide","Other"],
  "District of Columbia": ["Washington, DC metro","Statewide","Other"],
  "Florida": ["Miami / South Florida","Orlando","Tampa Bay","Jacksonville","Tallahassee","Southwest Florida","Statewide","Other"],
  "Georgia": ["Atlanta metro","Savannah","Augusta","Columbus / Macon","Statewide","Other"],
  "Hawaii": ["Oahu","Maui","Big Island","Kauai","Statewide","Other"],
  "Idaho": ["Boise","Idaho Falls","Twin Falls","North Idaho","Statewide","Other"],
  "Illinois": ["Chicago metro","Rockford","Peoria","Springfield","Southern Illinois","Statewide","Other"],
  "Indiana": ["Indianapolis","Fort Wayne","South Bend","Evansville","Statewide","Other"],
  "Iowa": ["Des Moines","Cedar Rapids","Quad Cities","Sioux City","Statewide","Other"],
  "Kansas": ["Kansas City metro","Wichita","Topeka / Lawrence","Statewide","Other"],
  "Kentucky": ["Louisville","Lexington","Northern Kentucky","Bowling Green","Statewide","Other"],
  "Louisiana": ["New Orleans","Baton Rouge","Shreveport","Lafayette","Statewide","Other"],
  "Maine": ["Portland","Bangor","Central / Northern Maine","Statewide","Other"],
  "Maryland": ["Baltimore","DC suburbs (MD)","Annapolis / Eastern Shore","Statewide","Other"],
  "Massachusetts": ["Boston metro","Worcester","Springfield","Cape Cod","Statewide","Other"],
  "Michigan": ["Detroit metro","Grand Rapids","Lansing","Ann Arbor","Upper Peninsula","Statewide","Other"],
  "Minnesota": ["Minneapolis–St. Paul","Rochester","Duluth","Statewide","Other"],
  "Mississippi": ["Jackson","Gulf Coast","Memphis suburbs (MS)","Statewide","Other"],
  "Missouri": ["St. Louis","Kansas City","Springfield","Columbia","Statewide","Other"],
  "Montana": ["Billings","Missoula","Bozeman","Great Falls","Statewide","Other"],
  "Nebraska": ["Omaha","Lincoln","Western Nebraska","Statewide","Other"],
  "Nevada": ["Las Vegas","Reno / Tahoe","Rural Nevada","Statewide","Other"],
  "New Hampshire": ["Manchester","Portsmouth / Seacoast","White Mountains","Statewide","Other"],
  "New Jersey": ["North Jersey / NYC metro","Central Jersey","South Jersey / Philly metro","Statewide","Other"],
  "New Mexico": ["Albuquerque","Santa Fe","Las Cruces","Statewide","Other"],
  "New York": ["New York City","Long Island","Hudson Valley","Buffalo / Rochester","Syracuse / Central NY","Capital District","Statewide","Other"],
  "North Carolina": ["Charlotte","Raleigh–Durham","Greensboro","Asheville","Coastal NC","Statewide","Other"],
  "North Dakota": ["Fargo","Bismarck","Minot","Statewide","Other"],
  "Ohio": ["Columbus","Cleveland","Cincinnati","Dayton","Toledo","Statewide","Other"],
  "Oklahoma": ["Oklahoma City","Tulsa","Lawton","Statewide","Other"],
  "Oregon": ["Portland metro","Eugene","Salem","Bend","Southern Oregon","Statewide","Other"],
  "Pennsylvania": ["Philadelphia","Pittsburgh","Harrisburg","Lehigh Valley","Erie","Statewide","Other"],
  "Rhode Island": ["Providence metro","Statewide","Other"],
  "South Carolina": ["Charleston","Columbia","Greenville–Spartanburg","Myrtle Beach","Statewide","Other"],
  "South Dakota": ["Sioux Falls","Rapid City","Statewide","Other"],
  "Tennessee": ["Nashville","Memphis","Knoxville","Chattanooga","Statewide","Other"],
  "Texas": ["Houston","Dallas–Fort Worth","Austin","San Antonio","El Paso","Rio Grande Valley","West Texas","Statewide","Other"],
  "Vermont": ["Burlington","Central Vermont","Statewide","Other"],
  "Virginia": ["Northern Virginia","Richmond","Hampton Roads","Roanoke","Charlottesville","Statewide","Other"],
  "Washington": ["Seattle metro","Spokane","Tacoma / South Sound","Tri-Cities","Bellingham","Statewide","Other"],
  "West Virginia": ["Charleston","Morgantown","Eastern Panhandle","Statewide","Other"],
  "Wisconsin": ["Milwaukee","Madison","Green Bay","La Crosse","Statewide","Other"],
  "Wyoming": ["Cheyenne","Casper","Jackson / resort","Statewide","Other"],
  "Puerto Rico": ["San Juan metro","Ponce","Mayagüez","Eastern PR","Statewide","Other"],
  "Guam": ["Guam","Statewide","Other"],
  "U.S. Virgin Islands": ["St. Thomas","St. Croix","St. John","Statewide","Other"],
  "American Samoa": ["American Samoa","Statewide","Other"],
  "Northern Mariana Islands": ["Saipan","Tinian / Rota","Statewide","Other"],
};

export function getTerritoryOptionsForState(state: string): readonly string[] {
  if (state === "Utah") return UTAH_TERRITORY_OPTIONS;
  return TERRITORIES_BY_STATE[state] ?? ["Statewide", OTHER_TERRITORY];
}

export function isOtherTerritory(territory: string): boolean {
  return territory === OTHER_TERRITORY || territory === LEGACY_OTHER_UTAH;
}

export function formatRosterLocation(data: {
  homeState: string;
  cityArea: string;
  cityAreaOther: string;
}): string {
  const territoryLabel = isOtherTerritory(data.cityArea) && data.cityAreaOther.trim()
    ? data.cityAreaOther.trim()
    : data.cityArea;
  if (data.homeState && territoryLabel) return `${territoryLabel}, ${data.homeState}`;
  return territoryLabel || data.homeState || "";
}
