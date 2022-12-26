import EditColorCell from 'src/components/Color/EditColorCell'

type ColorPageProps = {
  id: number
}

const EditColorPage = ({ id }: ColorPageProps) => {
  return <EditColorCell id={id} />
}

export default EditColorPage
