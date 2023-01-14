import { Select } from "antd";

interface Props {
  label: string;
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
  handleSelect: (value: { value: string; label: string } | undefined) => void;
}

const SelectFilter = ({ label, placeholder, options, handleSelect }: Props) => {
  return (
    <div className="filter">
      <p className="header-font">{label}</p>
      <Select
        onChange={handleSelect}
        onClear={() => {
          handleSelect(undefined);
        }}
        style={{ minWidth: "250px" }}
        showSearch
        labelInValue
        placeholder={placeholder}
        optionFilterProp="label"
        allowClear
        placement="bottomLeft"
        size="large"
        options={options}
      />
    </div>
  );
};

export default SelectFilter;
