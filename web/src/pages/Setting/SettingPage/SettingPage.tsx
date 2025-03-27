import SettingCell from "src/components/Setting/SettingCell";

type SettingPageProps = {
  id: number;
};

const SettingPage = ({ id }: SettingPageProps) => {
  return <SettingCell id={id} />;
};

export default SettingPage;
