import EditSettingCell from "src/components/Setting/EditSettingCell";

type SettingPageProps = {
  id: number;
};

const EditSettingPage = ({ id }: SettingPageProps) => {
  return <EditSettingCell id={id} />;
};

export default EditSettingPage;
