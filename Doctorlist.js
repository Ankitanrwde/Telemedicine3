import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({ name: "", speciality: "", hospital: "", address: "", contact: "" });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const addDoctor = () => {
    if (doctor.name && doctor.speciality && doctor.hospital && doctor.address && doctor.contact) {
      setDoctors([...doctors, doctor]);
      setDoctor({ name: "", speciality: "", hospital: "", address: "", contact: "" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Doctor</h2>
      <div className="grid gap-4 p-4 bg-white rounded-lg shadow-lg">
        <Input type="text" placeholder="Doctor Name" name="name" value={doctor.name} onChange={handleChange} />
        <Input type="text" placeholder="Speciality" name="speciality" value={doctor.speciality} onChange={handleChange} />
        <Input type="text" placeholder="Hospital" name="hospital" value={doctor.hospital} onChange={handleChange} />
        <Input type="text" placeholder="Address" name="address" value={doctor.address} onChange={handleChange} />
        <Input type="text" placeholder="Contact" name="contact" value={doctor.contact} onChange={handleChange} />
        <Button onClick={addDoctor} className="bg-blue-600 hover:bg-blue-700 text-white">Add Doctor</Button>
      </div>
      
      <h2 className="text-2xl font-bold mt-6">Doctor List</h2>
      <div className="grid gap-4 mt-4">
        {doctors.map((doc, index) => (
          <Card key={index} className="p-4 bg-gray-100">
            <CardContent>
              <p><strong>Name:</strong> {doc.name}</p>
              <p><strong>Speciality:</strong> {doc.speciality}</p>
              <p><strong>Hospital:</strong> {doc.hospital}</p>
              <p><strong>Address:</strong> {doc.address}</p>
              <p><strong>Contact:</strong> {doc.contact}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
