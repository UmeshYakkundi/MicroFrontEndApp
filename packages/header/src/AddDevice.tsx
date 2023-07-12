import React, { useState, useEffect } from 'react';
import './adddevice.scss';

interface StorageDevice {
  id: number;
  name: string;
  capacity: string;
  hostName: string;
  driveName: string;
  volumeName: string;
  nodeName: string;
  diskName: string;
}

const AddDevice: React.FC = (compProps: any) => {
  const [storageDevices, setStorageDevices] = useState<StorageDevice[]>([]);
  const [newDeviceName, setNewDeviceName] = useState<string>('');
  const [newDeviceCapacity, setNewDeviceCapacity] = useState<string>('');
  const [newHostName, setNewHostName] = useState<string>('');
  const [newDriveName, setNewDriveName] = useState<string>('');
  const [newVolumeName, setNewVolumeName] = useState<string>('');
  const [newNodeName, setNewNodeName] = useState<string>('');
  const [newDiskName, setNewDiskName] = useState<string>('');
  const [isDevice, setisDevice] = useState<boolean>(true);
  

  const handleAddDevice = (event: React.FormEvent) => {
    event.preventDefault();
    if (newDeviceName.trim() === '' && newDeviceCapacity.trim() === '') {
      return;
    }

    const newDevice: StorageDevice = {
      id: Date.now(),
      name: newDeviceName,
      capacity: newDeviceCapacity,
      hostName: newHostName,
      driveName: newDriveName,
      volumeName: newVolumeName,
      nodeName: newNodeName,
      diskName: newDiskName,

    };
    sendDataToOtherMicrofrontend(newDevice);
    setNewDeviceName('');
    setNewDeviceCapacity('');
    setNewHostName('');
    setNewDriveName('');
    setNewVolumeName('');
    setNewNodeName('');
    setNewDiskName('');
  };

  const sendDataToOtherMicrofrontend = (data: any) => {
    compProps.passAddedDevice(data);
    const event = new CustomEvent<any>('dataEvent', { detail: data });
    window.dispatchEvent(event);
  };

  return (
    <div >
      <h2>Add Storage Device</h2>
      <div className="right-content">

        <form onSubmit={handleAddDevice}>
          <input
            id="deviceName"
            type="text"
            placeholder="Device Name"
            value={newDeviceName}
            onChange={(event) => setNewDeviceName(event.target.value)}
          />
          <input
            id="capacity"
            type="text"
            placeholder="Device Capacity"
            value={newDeviceCapacity}
            onChange={(event) => setNewDeviceCapacity(event.target.value)}
          />

          {/* //2 */}
          <input
            id="deviceName"
            type="text"
            placeholder="Host Name"
            value={newHostName}
            onChange={(event) => setNewHostName(event.target.value)}
          />

          {/* //3 */}
          <input
            id="deviceName"
            type="text"
            placeholder="Drive Name"
            value={newDriveName}
            onChange={(event) => setNewDriveName(event.target.value)}
          />


          <input
            id="deviceName"
            type="text"
            placeholder="Volume Name"
            value={newVolumeName}
            onChange={(event) => setNewVolumeName(event.target.value)}
          />


          <input
            id="deviceName"
            type="text"
            placeholder="Node Name"
            value={newNodeName}
            onChange={(event) => setNewNodeName(event.target.value)}
          />


          <input
            id="deviceName"
            type="text"
            placeholder="Disk Name"
            value={newDiskName}
            onChange={(event) => setNewDiskName(event.target.value)}
          />


          <button type="submit">Add Device</button>
        </form>

        <br />
        <div id="btnDeleteSuccess" className="alert">
          <h3>{isDevice ? "Selected Device" : "Related Resource"}</h3>
          {compProps?.selectedDevice?.name}
        </div>
      </div>

    </div>
  );
};

export default AddDevice;
