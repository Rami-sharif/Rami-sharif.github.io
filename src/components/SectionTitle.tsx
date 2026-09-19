type SectionTitleProps = {
  number: string
  title: string
}

function SectionTitle({ number, title }: SectionTitleProps) {
  return (
    <h2 className="section-title">
      <span className="title-number">{number}.</span>
      {title}
    </h2>
  )
}

export default SectionTitle

