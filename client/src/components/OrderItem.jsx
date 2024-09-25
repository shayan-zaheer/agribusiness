import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function OrderItem() {
	const { t } = useTranslation();
	// bg-[#6c926c]
	return (
		<div className="flex justify-between bg-[rgb(167,217,167)] text-black p-4 rounded-md m-5">
			<div>
				<p>
					<strong>{t("farmer name")}:</strong>
				</p>
				<p>
					<strong>{t("variety")}:</strong>
				</p>
				<p>
					<strong>{t("quantity")}:</strong>
				</p>
				<p>
					<strong>{t("order date")}:</strong>
				</p>
				<p>
					<strong>{t("status")}:</strong>
				</p>
			</div>
			<div className="flex gap-1">
				<Link to="/message">
					<strong>{t("message farmer")}</strong>
				</Link>
				<img className="w-32 h-32" src="./wheat.png" alt="" />
			</div>
		</div>
	);
}

export default OrderItem;
