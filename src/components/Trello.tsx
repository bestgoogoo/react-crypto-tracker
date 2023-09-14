import { useRecoilState } from "recoil";
import { hourSeletor, minuteState } from "../atoms";

function Trello() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSeletor);
  const onChangeMinute = (event: React.FormEvent<HTMLInputElement>) => {
    // Number(value) = +value
    setMinutes(+event.currentTarget.value);
  };
  const onChangeHour = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onChangeMinute}
        type="number"
        placeholder="Minutes"
      />
      <input
        value={hours}
        onChange={onChangeHour}
        type="number"
        placeholder="Hours"
      />
    </div>
  );
}

export default Trello;
