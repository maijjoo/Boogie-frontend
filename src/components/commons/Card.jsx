const Card = ({ image, beachName, worker, date, status }) => {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden w-60 h-90 relative">
      <img src={image} alt={beachName} className="w-60 h-60 object-cover" />
      <p className="absolute top-3 right-3 p-1 font-bold bg-red-500 text-m text-white rounded">
        {status}
      </p>
      <div className="p-4 bg-white h-30">
        <h2 className="font-semibold text-l mb-2">{beachName}</h2>
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">{worker}</p>
          <p className="text-sm text-gray-600">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
