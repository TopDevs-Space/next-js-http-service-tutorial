import React, { useState, useEffect } from "react";

// SERVICES
import { HttpService } from "@/services";

// TYPES
import { IModel } from "@/types";

const HomePage = () => {
  const http = new HttpService();
  const [users, setUsers] = useState<IModel.IUser[]>([]);

  const spoolUserRecords = async () => {    
    const response = await http.service().get<IModel.IUser[]>(`/users`);

    if (response?.length) setUsers([...response]);
  };

  useEffect(() => {
    console.log({ users });
  }, []);

  useEffect(() => {
    spoolUserRecords();
  }, []);

  return (
    <>
      <h1>Next JS App Works!</h1>
    </>
  );
};

export { HomePage as default };
