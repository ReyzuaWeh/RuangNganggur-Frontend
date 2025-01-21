import images_source from "@/assets/get/images";

const Loading = () => {
  return (
    <div className="loading">
      <div className='gambar'>
        {/* @ts-ignore */}
        <img src={images_source["../RuangNganggur-Icon.png"].default} alt=''></img>
      </div>
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;