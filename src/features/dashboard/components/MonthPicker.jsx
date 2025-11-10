import { useMemo } from "react";
import UiSelect from "../../../components/common/Select";

export default function MonthPicker({ value, onChange, minYear = 2020, maxYear }){
  const now = new Date();
  const _maxYear = maxYear ?? now.getFullYear() + 1;

  const { year, month } = useMemo(() => {
    const [y, m] = (value || "").split("-");
    return { year: Number(y) || now.getFullYear(), month: Number(m) || now.getMonth() + 1 };
  }, [value]);

  const months = Array.from({ length:12 }, (_, i) => ({ value:String(i+1), label:`Tháng ${i+1}` }));
  const years  = Array.from({ length:_maxYear - minYear + 1 }, (_, i) => {
    const y = minYear + i; return { value:String(y), label:String(y) };
  });

  const setVal = (y, m) => onChange?.(`${y}-${String(m).padStart(2,"0")}`);

  return (
    <div className="page-tools"> {/* dùng chung */}
      <UiSelect value={String(month)} options={months} onChange={(m) => setVal(year, Number(m))} />
      <UiSelect value={String(year)}  options={years}  onChange={(y) => setVal(Number(y), month)} />
    </div>
  );
}
