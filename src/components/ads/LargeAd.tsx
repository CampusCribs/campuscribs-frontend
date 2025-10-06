const LargeAd = () => {
  return (
    <a>
      <div className="w-full h-full aspect-[4/3]  rounded-lg shadow-md">
        <div>
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.XlptLr4Fpw63rgGYm18ZnwHaIl?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Ad"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2 ">Sponsored Ad</h2>
          <p className="text-gray-700">Check out this amazing offer!</p>
        </div>
      </div>
    </a>
  );
};
export default LargeAd;
