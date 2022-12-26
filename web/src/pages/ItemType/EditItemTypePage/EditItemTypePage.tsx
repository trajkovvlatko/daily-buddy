import EditItemTypeCell from 'src/components/ItemType/EditItemTypeCell'

type ItemTypePageProps = {
  id: number
}

const EditItemTypePage = ({ id }: ItemTypePageProps) => {
  return <EditItemTypeCell id={id} />
}

export default EditItemTypePage
