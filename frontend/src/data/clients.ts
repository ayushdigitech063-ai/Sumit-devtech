import { IMG } from "./home";

const logo = (file: string) => `${IMG}/client-logos/${file}.svg`;

export const clients = [
  { name: "Brand Knock", logo: logo("Brand-Knock") },
  { name: "Bsix Engineering", logo: logo("Bsix-engineering") },
  { name: "Cherry Cabs", logo: logo("Cherrycabs") },
  { name: "Dev Tourist", logo: logo("Devtourist") },
  { name: "Doli Saja Ke Rakhna", logo: logo("Dolisajakerakhna") },
  { name: "Dr Manish Ganwani", logo: logo("Drmanishganwani") },
  { name: "Dulha Ghar", logo: logo("Dulhaghar") },
  { name: "Golf Course Prints", logo: logo("Golfcourseprints") },
  { name: "Homerox", logo: logo("Homerox") },
  { name: "Laser Machine Manufacturers", logo: logo("Laser-machine-manufacturers") },
  { name: "Lecture Kharido", logo: logo("Lecture-kharido") },
  { name: "Masterbatch", logo: logo("Masterbatch") },
  { name: "Sidhu Travels", logo: logo("Sidhutravels") },
  { name: "Spherule", logo: logo("Spherule") },
  { name: "Subsidy Mantra", logo: logo("Subsidymantra") },
  { name: "Tech Mahindra Foundation", logo: logo("Tech-Mahindra-Foundation") },
  { name: "Yuvti", logo: logo("Yuvti") },
  { name: "Baar House", logo: logo("baar-house") },
  { name: "eFacto", logo: logo("eFacto") },
  { name: "IBL Classes", logo: logo("iblclasses") },
  { name: "Jahangir Tutorials", logo: logo("jahangir-tutorials") },
];