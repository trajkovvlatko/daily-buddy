import ItemTypeCell from 'src/components/ItemType/ItemTypeCell'

type ItemTypePageProps = {
  id: number
}

const ItemTypePage = ({ id }: ItemTypePageProps) => {
  return <ItemTypeCell id={id} />
}

export default ItemTypePage
