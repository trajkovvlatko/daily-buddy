import EditDrawerCell from 'src/components/Drawer/EditDrawerCell'

type DrawerPageProps = {
  id: number
}

const EditDrawerPage = ({ id }: DrawerPageProps) => {
  return <EditDrawerCell id={id} />
}

export default EditDrawerPage
