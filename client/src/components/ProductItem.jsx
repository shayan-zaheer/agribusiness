import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
	const { t } = useTranslation();

	return (
		<div className="flex justify-between bg-[rgb(167,217,167)] text-black p-4 rounded-md m-5">
			<div>
				<p>
					<strong>{t("product name")}: {product.name}</strong>
				</p>
				<p>
					<strong>{t("description")}: {product.description}</strong>
				</p>
				<p>
					<strong>{t("price")}: ${product.price}</strong>
				</p>
				<p>
					<strong>{t("quantity available")}: {product.quantityAvailable}</strong>
				</p>
				<p>
					<strong>{t("category")}: {product.category}</strong>
				</p>
			</div>
			<div className="flex gap-1">
				<Link to={`/products/${product._id}`}>
					<strong>{t("view product")}</strong>
				</Link>
				<img className="w-32 h-32" src={product.image} alt={product.name} />
			</div>
		</div>
	);
}

export default ProductItem;
