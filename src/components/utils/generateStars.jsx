import { FaStar } from 'react-icons/fa';

export const generateStars = (score) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < score) {
            stars.push(<FaStar key={i} className="text-accent" />);
        } else {
            stars.push(<FaStar key={i} className="text-gray-300" />);
        }
    }
    return stars;
};