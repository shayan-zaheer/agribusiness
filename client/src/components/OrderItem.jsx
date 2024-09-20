import { useTranslation } from "react-i18next";

function OrderItem(){
    const {t} = useTranslation();
	return (
		<div className="flex justify-between bg-[#6C926C] text-black p-4 rounded-md m-5">
			<div>
				<p> 
					<strong>{t("farmer name")}</strong>
				</p>
				<p>
					<strong>{t("variety")}</strong>
				</p>
				<p>
					<strong>{t("quantity")}</strong>
				</p>
				<p>
					<strong>{t("order date")}</strong>
				</p>
				<p>
					<strong>{t("status")}</strong>
				</p>
			</div>
			<div>
				<img className="w-32 h-32" src="./wheat.png" alt="" />
			</div>
		</div>
	);
};

export default OrderItem;
