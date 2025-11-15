import { Model, Types } from 'mongoose';

export interface TUserName {
  firstName: string;
  lastName?: string;
}

export interface TAddress {
  /*  Building / apartment-complex name printed on the front gate 
      e.g. “Saima Tower”, “Green View Villa”                                  */
  villaName: string;

  /*  Administrative division (বিভাগ) – exact spelling for receipts
      e.g. “Dhaka”, “Chattogram”, “Rajshahi”                                */
  division: string;

  /*  District (জেলা) name – keep lower-case to match official list
      e.g. “Dhaka”, “Comilla”, “Sylhet”                                     */
  district: string; // ← fixed capital: string  (not String)

  /*  Police station / Thana (থানা) – used for legal address & courier
      e.g. “Mohammadpur”, “Panchlaish”, “Kotwali”                          */
  policeStation: string;

  /*  Local area / neighbourhood / sector / মহল্লা
      e.g. “Mohammadpur”, “Block-C”, “West Shewrapara”                     */
  areaName: string;

  /*  Official road / lane name (empty if unnamed)
      e.g. “Mirpur Road”, “60 Feet Road”, “Lake Drive”                     */
  roadName: string;

  /*  4-digit Bangladesh postcode – used for courier & tax docs
      e.g. “1207”, “4000”, “3100”                                           */
  postalCode: string;

  /*  Backup landlord / caretaker number (with country code)
      e.g. “+8801712345678”                                                 */
  phoneNumber: string;

  /*  House or holding number visible on the facade
      e.g. “43/A”, “12”, “156 (Old 84)”      OPTIONAL                        */
  houseNumber?: string;

  /*  Floor level (words or numbers) – helps visitors / delivery
      e.g. “3rd floor”, “Level-4”, “Ground”  OPTIONAL                        */
  floorNumber?: string;

  /*  Brief landmark for ride-share drivers
      e.g. “Opposite Janata Bank ATM”, “Beside Mosjid-gate” OPTIONAL         */
  directions?: string;

  /*  Unit identifier inside the building
      e.g. “Flat-B2”, “Apt-5C”, “Unit-401”                                  */
  flatNumber: string;

  /*  Block / section label for large complexes
      e.g. “Block-C”, “Sector-3”, “Phase-2”                                 */
  block: string;

  /*  Prominent nearby reference point (printed on receipt if provided)
      e.g. “Near Mohammadpur Bus Stand”, “Behind Police Box”                */
  landmark: string;
}

export interface TLandlord {
  user: Types.ObjectId;
  name: TUserName;
  address: TAddress;
  email?: string;
  gender: 'male' | 'female' | 'other';
  profilePicture?: string;
  isDeleted: boolean;
}

export interface LandlordModel extends Model<TLandlord> {
  isUserExists(id: string): Promise<TLandlord>;
}
