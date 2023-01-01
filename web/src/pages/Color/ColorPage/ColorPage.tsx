import ColorCell from 'src/components/Color/ColorCell'

type ColorPageProps = {
  id: number
}

const ColorPage = ({ id }: ColorPageProps) => {
  return <ColorCell id={id} />
}

export default ColorPage
