import { Airport } from "@/types";

export const INDIAN_AIRPORTS: Airport[] = [
  { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru / Bangalore', state: 'Karnataka' },
  { code: 'AMD', name: 'Sardar Vallabhbhai Patel International Airport', city: 'Ahmedabad', state: 'Gujarat' },
  { code: 'JAI', name: 'Jaipur International Airport', city: 'Jaipur', state: 'Rajasthan' },
  { code: 'UDR', name: 'Maharana Pratap Airport', city: 'Udaipur', state: 'Rajasthan' },
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'New Delhi', state: 'Delhi' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', state: 'Telangana' },
  { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', state: 'Tamil Nadu' },
  { code: 'CCU', name: 'Netaji Subhash Chandra Bose International Airport', city: 'Kolkata', state: 'West Bengal' },
  { code: 'PNQ', name: 'Pune Airport', city: 'Pune', state: 'Maharashtra' },
  { code: 'COK', name: 'Cochin International Airport', city: 'Kochi', state: 'Kerala' },
  { code: 'GOI', name: 'Dabolim Airport', city: 'Goa (Dabolim)', state: 'Goa' },
  { code: 'GOX', name: 'Manohar International Airport', city: 'Goa (Mopa)', state: 'Goa' },
  { code: 'LKO', name: 'Chaudhary Charan Singh International Airport', city: 'Lucknow', state: 'Uttar Pradesh' },
  { code: 'PAT', name: 'Jay Prakash Narayan Airport', city: 'Patna', state: 'Bihar' },
  { code: 'BBI', name: 'Biju Patnaik Airport', city: 'Bhubaneswar', state: 'Odisha' },
  { code: 'GAU', name: 'Lokpriya Gopinath Bordoloi International Airport', city: 'Guwahati', state: 'Assam' },
  { code: 'IXC', name: 'Shaheed Bhagat Singh International Airport', city: 'Chandigarh', state: 'Punjab' },
  { code: 'IDR', name: 'Devi Ahilyabai Holkar Airport', city: 'Indore', state: 'Madhya Pradesh' },
  { code: 'NAG', name: 'Dr. Babasaheb Ambedkar International Airport', city: 'Nagpur', state: 'Maharashtra' },
  { code: 'VNS', name: 'Lal Bahadur Shastri International Airport', city: 'Varanasi', state: 'Uttar Pradesh' },
  { code: 'RPR', name: 'Swami Vivekananda Airport', city: 'Raipur', state: 'Chhattisgarh' },
  { code: 'JDH', name: 'Jodhpur Airport', city: 'Jodhpur', state: 'Rajasthan' },
  { code: 'TRV', name: 'Trivandrum International Airport', city: 'Thiruvananthapuram', state: 'Kerala' },
  { code: 'SXR', name: 'Sheikh ul-Alam International Airport', city: 'Srinagar', state: 'Jammu & Kashmir' },
  { code: 'IXR', name: 'Birsa Munda Airport', city: 'Ranchi', state: 'Jharkhand' },
  { code: 'BDQ', name: 'Vadodara Airport', city: 'Vadodara', state: 'Gujarat' },
  { code: 'STV', name: 'Surat Airport', city: 'Surat', state: 'Gujarat' },
  { code: 'VTZ', name: 'Visakhapatnam Airport', city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { code: 'ATQ', name: 'Sri Guru Ram Dass Jee International Airport', city: 'Amritsar', state: 'Punjab' },
  { code: 'DED', name: 'Jolly Grant Airport', city: 'Dehradun', state: 'Uttarakhand' },
];

export function getAirportByCode(code: string): Airport | undefined {
  return INDIAN_AIRPORTS.find(a => a.code.toUpperCase() === code.toUpperCase());
}

export function searchAirports(query: string): Airport[] {
  if (!query) return INDIAN_AIRPORTS.slice(0, 8);
  const q = query.toLowerCase().trim();
  return INDIAN_AIRPORTS.filter(a => 
    a.code.toLowerCase().includes(q) ||
    a.city.toLowerCase().includes(q) ||
    a.name.toLowerCase().includes(q) ||
    a.state.toLowerCase().includes(q)
  );
}
