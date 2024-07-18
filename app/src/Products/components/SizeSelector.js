import { Link } from 'react-router-dom';

const SizeSelector = (props) => {
  const { skus, currentCode, updateCurrentSelection } = props;

  return (
    <div className="size-selector">
      <h2>Size</h2>
      <div className="size-variants">
        {skus && skus.map((sku, i) => {
          return (
            <Link key={i} className={`size-option ${sku.code === currentCode ? "selected" : ""}`} onClick={() => updateCurrentSelection(sku.code)}>
              <p>{sku.name}</p>
            </Link>
          )
        })}
        </div>
    </div>
  )
}

export default SizeSelector;