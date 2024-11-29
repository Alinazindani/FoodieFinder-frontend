import React, { useEffect, useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { Link } from "react-router-dom";
import "./RestaurantList.css";

const RestaurantList = () => {
  const { restaurants, setRestaurants, searchQuery } = useContext(RestaurantsContext);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // Fetch all restaurants when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.results);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      }
    };
    fetchData();
  }, [setRestaurants]);

  // Filter restaurants based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRestaurants(restaurants); // Show all if search is empty
    } else {
      const matches = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().startsWith(searchQuery.toLowerCase()) // Match start of the name
      );
      setFilteredRestaurants(matches);
    }
  }, [searchQuery, restaurants]);

  return (
    <div className="restaurant-container">
      {filteredRestaurants.length > 0 ? (
        filteredRestaurants.map((restaurant) => (
          <Link
            to={`/restaurants/${restaurant.restaurantid}`}
            key={restaurant.restaurantid}
            className="restaurant-row"
          >
            <img
              src={restaurant.image_url}
              alt={restaurant.name}
              className="restaurant-image"
            />
            <div className="restaurant-details">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.city}</p>
              <p>{restaurant.description}</p>
              <p>
                Delivery: {restaurant.delivery_available ? "✔️" : "❌"} | Takeout:{" "}
                {restaurant.takeout_available ? "✔️" : "❌"} | Dine-in:{" "}
                {restaurant.dinein_available ? "✔️" : "❌"}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p className="no-restaurants">No restaurant available.</p>
      )}
    </div>
  );
};

export default RestaurantList;
