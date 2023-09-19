/* eslint-disable prettier/prettier */
exports.TypeMasterInitialValues = {
    property_main_type: [
        { residential: 'Residential' },
        { commercial: 'Commercial' },
    ],
    property_listing_type: [
        {
            sale: 'Sale',
            rent: 'Rent',
        },
    ],
    property_furnishing_type: [
        {
            furnished: 'Furnished',
            'semi-furnished': 'Semi-Furnished',
            'un-furnished': 'Un-Furnished',
        },
    ],
    property_room_type: [
        { deluxe: 'Deluxe' },
        { luxury: 'Luxury' },
        { fitted: 'Fitted' },
    ],
    currencies: [
        { gbp: 'GBP' },
        { eur: 'EURO' },
        { sar: 'SAR' },
        { usd: 'USD' },
        { aed: 'AED' },
        { bam: 'BAM' },
        { chf: 'CHF' },
        { le: 'LE' },
        { RUP: 'RUP' }
    ],
    "property_possession_type": [
        { "upcoming": "Upcoming" },
        { "under-development": "Not Ready" },
        { "completed": "Ready" },
        { "1-plus-year": "1-plus-year" },
    ],
    property_status: [
        { 'approved': 'Approved' },
        { 'pending': 'Pending' },
        { 'in-review': 'In-review' },
        { 'rejected': 'Rejected' },
        { 'expired': 'Expired' },
        { 'archived': 'Archived' },
        { 'missing_info': 'Missing Info' },
        { 'renew': 'Renew' },

    ],
    property_facing_type: [
        { "east-north-facing": "East North Facing" },
        { "east-south-facing": "East South Facing" },
        { "west-north-facing": "West North Facing" },
        { "west-south-facing": "West South Facing" },
        { "east-facing": "East" },
        { "west-facing": "West" },
        { "north-facing": "North" },
        { "south-facing": "South" },
        { "south-east-facing": "South East" },
        { "south-west-facing": "South West" },
        { "north-east-facing": "North East" },
        { "north-west-facing": "North West" },
    ],
    "residence_type": [
        { "family": "Family" },
        { "single": "Single" },
    ],
    "requirement_property_type_commercial": [
        { "retail": "Retail" },
        { "office-space": "Office Space" },
        { "warehouse": "Warehouse" },
        { "labor-camp": "Labor Camp" },
        { "commercial-building": "Building" },
        { "showroom": "Showroom" },
        { "commercial-land": "Land" },
    ],
    "requirement_property_type_residential": [
        { "apartment": "Apartment" },
        { "duplex": "Duplex" },
        { "palace": "Palace" },
        { "residential-land": "Land" },
        { "rest-house": "Rest House" },
        { "chalet": "Chalet" },
        { "floor": "Floor" },
        { "apartment": "Apartment" },
    ]
};

exports.generateSQLInserts = (data) => {
    const values = [];
    for (let item in data) {
        data[item].forEach((val) => {
            for (let key in val) {
                values.push(`('${item}', '${key}', '${val[key]}')`);
            }
        })
    }
    const sqlInsert = `
      INSERT INTO type_masters (type, slug, name)
      VALUES ${values.join(',\n')};
    `;

    return sqlInsert;
}

exports.generateSQLDeletes = (data) => {
    const deletes = [];
    for (let item in data){
        data[item]?.forEach((val)=>{
          for (let slug in val){
            deletes.push(`DELETE FROM type_masters WHERE type = '${item}' AND slug = '${slug}';`);
          }
        })
    }

    return deletes.join('\n');
}