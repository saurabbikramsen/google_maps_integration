import { useEffect, useMemo, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import { toast } from "react-toastify";

function ProvideInfo() {
  const url = "http://localhost:8000/vendor/add";

  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [vendor_name, setVendor_name] = useState("");
  const [email, setEmail] = useState("");
  const [service_type, setService_type] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postal_code, setPostal] = useState("");
  const [house_number, setNumber] = useState("");

  const handleName = (e: any) => {
    setVendor_name(e.target.value);
    console.log(e.target.value);
  };
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleContact = (e: any) => {
    setContact(e.target.value);
  };

  const handleService = (e: any) => {
    setService_type(e.target.value);
  };

  const handleState = (e: any) => {
    setState(e.target.value);
  };

  const handleCity = (e: any) => {
    setCity(e.target.value);
  };

  const handlePostal = (e: any) => {
    setPostal(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const handleStreet = (e: any) => {
    setStreet(e.target.value);
  };
  useEffect(() => {
    // Retrieve user's location using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.log("Error getting location:", error);
      }
    );
  }, []);

  const addVendor = () => {
    console.log(currentLocation);
    const vendor = {
      name: vendor_name,
      email,
      contact,
      service_type,
      password,
      state,
      city,
      postal_code,
      street,
      number: "1",
      lat: currentLocation ? currentLocation.lat : -82.2196534,
      lng: currentLocation ? currentLocation.lng : 56.81587,
    };
    console.log(vendor);
    axios
      .post(`${url}`, vendor)
      .then((response) => {
        toast.success(response.data.msg);
      })
      .catch((response: any) => {
        toast.error(response.response.data.message);
      });
  };
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-screen flex  items-center justify-center">
      <div className="flex flex-col gap-5 w-fit h-fit bg-gray-100 rounded-md p-10">
        <h1 className="text-center font-bold text-4xl mb-5">Add Vendor</h1>
        <div className="flex gap-10">
          <div className="flex flex-col w-fit">
            <label>Name</label>
            <input type="text" name="name" onChange={handleName} />
          </div>
          <div className="flex flex-col w-fit">
            <label>Email</label>
            <input type="text" name="email" onChange={handleEmail} />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col w-fit">
            <label>Contact</label>
            <input type="text" name="contact" onChange={handleContact} />
          </div>

          <div className="flex flex-col w-fit">
            <label>service_type</label>
            <input type="text" name="service_type" onChange={handleService} />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col w-fit">
            <label>State </label>
            <input type="text" name="state" onChange={handleState} />
          </div>
          <div className="flex flex-col w-fit">
            <label>City</label>
            <input type="text" name="city" onChange={handleCity} />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col w-fit">
            <label>Postal_code</label>
            <input type="text" name="postal_code" onChange={handlePostal} />
          </div>
          <div className="flex flex-col w-fit">
            <label>Street</label>
            <input type="text" name="street" onChange={handleStreet} />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col w-fit">
            <label>Password</label>
            <input type="password" name="password" onChange={handlePassword} />
          </div>
        </div>
        <button
          className="py-3 px-4 bg-violet-400 w-full rounded-md"
          onClick={addVendor}
        >
          Submit
        </button>

        <div className="w-full h-80">
          {currentLocation && (
            <GoogleMap
              mapContainerStyle={{ height: "100%", width: "100%" }}
              center={currentLocation}
              zoom={14}
            >
              <Marker position={currentLocation} />
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProvideInfo;
