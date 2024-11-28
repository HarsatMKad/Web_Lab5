import shareCopy from "../assets/share_button_copy.svg";
import shareVK from "../assets/share_button_vk.svg";
import shareTG from "../assets/share_button_telegram.svg";
import shareWhatsapp from "../assets/share_button_whatsapp.svg";
import shareFacebook from "../assets/share_button_facebook.svg";

type Props = { showAlert: (alert: JSX.Element) => void };

function ShareTaskMenu(props: Props) {
  function closeAlert() {
    props.showAlert(<></>);
  }

  return (
    <div className="blur_background" onClick={closeAlert}>
      <div className="share_box">
        <button className="share_box_button">
          <img src={shareCopy} alt="" />
        </button>

        <button className="share_box_button">
          <img src={shareVK} alt="" />
        </button>

        <button className="share_box_button">
          <img src={shareTG} alt="" />
        </button>

        <button className="share_box_button">
          <img src={shareWhatsapp} alt="" />
        </button>

        <button className="share_box_button">
          <img src={shareFacebook} alt="" />
        </button>
      </div>
    </div>
  );
}

export default ShareTaskMenu;
