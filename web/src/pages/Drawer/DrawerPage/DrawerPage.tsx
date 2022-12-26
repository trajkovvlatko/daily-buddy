import DrawerCell from 'src/components/Drawer/DrawerCell'

type DrawerPageProps = {
  id: number
}

const DrawerPage = ({ id }: DrawerPageProps) => {
  return <DrawerCell id={id} />
}

export default DrawerPage
