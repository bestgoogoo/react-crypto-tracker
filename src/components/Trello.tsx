import { useRecoilState, useRecoilValue } from "recoil";
import { hourSeletor, minuteState } from "../atoms";

function Trello() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hours = useRecoilValue(hourSeletor);
  const onChangeMinute = (event: React.FormEvent<HTMLInputElement>) => {
    // Number(value) = +value
    setMinutes(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onChangeMinute}
        type="number"
        placeholder="Minutes"
      />
      <input value={hours} type="number" placeholder="Hours" />
    </div>
  );
}

export default Trello;
