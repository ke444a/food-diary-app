const MealInfo = ({food}) => {
    return (
        <div className="animate-fade-in fixed bg-white-new top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-md">
            <img 
                className="w-full h-64 object-cover rounded-t-md"
                src="https://www.edamam.com/food-img/53a/53a7ab7c4e3ed54e608c2f82e736f6d4.jpg"
                alt=""
            />
            <div>
                <div className="flex justify-between items-start mb-1 md:mb-2">
                    <h4
                        className="font-bold font-heading leading-5 cursor-pointer">
                        {food.meal_name}
                    </h4>
                </div>
                <div className="flex justify-between text-sm mb-3 py-1 border-y-[1px] border-opacity-30 border-dark">
                    <div className="flex flex-col justify-end space-y-2">
                        <p>Protein: </p>
                        <p>Fat: </p>
                        <p>Carbs: </p>
                        <p className="font-bold">Calories: </p>
                    </div>
                    <div className="flex flex-col justify-end space-y-2 text-right">
                        <p>{food.protein_amount} g</p>
                        <p>{food.fat_amount} g</p>
                        <p>{food.carbs_amount} g</p>
                        <p className="font-bold">{food.calories} cal</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealInfo;