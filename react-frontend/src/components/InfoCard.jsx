const InfoCard = () => {
    return (
        <div className="w-1/3 bg-white-new rounded-lg h-fit">
            <div className="flex flex-col justify-center px-4 py-6 text-center">
                <img className="w-48 h-48 rounded-[50%] mb-3 self-center" src="https://picsum.photos/200" />
                <h1 className="text-lg lg:text-xl font-medium font-heading mb-4">John Doe</h1>
                <div className="flex justify-between -mb-1">
                    <p className="">850</p>
                    <p className="">2500</p>
                </div>
                <div className="flex justify-between text-sm opacity-50 leading-4 mb-3">
                    <p>Total consumed</p>
                    <p>Daily limit</p>
                </div>
                <progress id="calories-bar" className="w-full h-2" value="850" max="2500"></progress>
                <label htmlFor="calories-bar" className="text-sm text-left">26%</label>
                <div className="flex justify-around mt-4">
                    <div>
                        <h4 className="font-medium">25.1 g</h4>
                        <p className="text-sm opacity-50">Protein</p>
                    </div>
                    <div>
                        <h4 className="font-medium">5.4 g</h4>
                        <p className="text-sm opacity-50">Fat</p>
                    </div>
                    <div>
                        <h4 className="font-medium">122.4 g</h4>
                        <p className="text-sm opacity-50">Carbs</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;