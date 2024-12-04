import Linegraph from "../components/Linegraph";
import { useEffect, useState } from "react";

function Logger() {
  const [value, setValue] = useState(null);
  useEffect(() => {
    const mavLinkDataListener = (event, data) => {
      setValue(data);
      console.log(data);
    };
    window.mavlink.onMavLinkData(mavLinkDataListener);
    return () => {
      window.mavlink.onMavLinkData(null);
    };
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
      <Linegraph title="Roll" newValue={value ? value.roll / 100 : 0} newTime={value ? value.timeBootMs : 0} reset={false} />
      <Linegraph title="Pitch" newValue={value ? value.pitch / 100 : 0} newTime={value ? value.timeBootMs : 0} reset={false} />
      <Linegraph title="Yaw" newValue={value ? value.yaw / 100 : 0} newTime={value ? value.timeBootMs : 0} reset={false} />
    </div>
  );
}

export default Logger;
