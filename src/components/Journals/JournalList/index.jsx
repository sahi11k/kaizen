import React from "react";
import styles from "./style.module.css";
import JournalCard from "@/components/Journals/JournalCard";
import InputBox from "@/components/Journals/InputBox";

// Example journal data - replace with actual data from your store/API
const sampleJournals = [
  {
    id: 1,
    title: "My Productive Morning",
    content:
      "Today was an incredibly productive morning that started with my usual 6 AM wake-up call. I immediately jumped out of bed feeling energized and ready to tackle the day ahead. After a quick stretch and some deep breathing exercises, I headed to the kitchen to prepare my favorite breakfast - oatmeal with fresh berries and a drizzle of honey. The combination of complex carbohydrates and natural sugars gave me the perfect energy boost I needed. While eating, I reviewed my daily goals and priorities, mentally organizing my tasks for maximum efficiency. The weather was perfect for my morning jog, so I laced up my running shoes and headed out for a 30-minute run through the neighborhood park. The fresh air and gentle exercise cleared my mind and boosted my mood significantly. Upon returning home, I took a refreshing shower and got dressed in my most comfortable work attire. I spent the next hour working on my most important project, making substantial progress that I'm really proud of. The morning flew by, and before I knew it, it was time for my first meeting of the day.",
  },
  {
    id: 2,
    title: "Weekend Adventures",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod totam molestiae consequatur odio et accusantium? Molestias laborum, quidem dicta tempora officia veritatis rem numquam magni culpa, fuga officiis impedit nesciunt! Enim harum inventore necessitatibus dolore numquam vero! Rerum nihil quibusdam error quas recusandae, deleniti sit ad eligendi sequi voluptatibus magnam beatae, pariatur veniam at, ea magni exercitationem quo? Ipsa, facilis.   Voluptatibus quae quisquam suscipit voluptate vel, consectetur ab numquam optio ipsa iusto quas possimus ipsam nostrum blanditiis, aut culpa eveniet? Quo beatae iusto tempora, temporibus tenetur aperiam doloribus laborum dolores! This weekend was filled with amazing adventures and memorable experiences that I'll cherish for years to come. Saturday morning started with a spontaneous decision to visit the local farmers market with my family. We discovered so many unique vendors selling everything from fresh produce to handmade crafts. I particularly enjoyed talking to the local honey farmer who explained the intricate process of beekeeping and let us sample different varieties of honey. We bought fresh strawberries, organic vegetables, and some delicious homemade bread that became the foundation for our weekend meals. Sunday was even more exciting as we decided to go hiking in the mountains. The trail was challenging but rewarding, offering breathtaking views of the valley below. We packed a picnic lunch and found the perfect spot to rest and enjoy our meal while taking in the spectacular scenery. The weather was absolutely perfect - sunny but not too hot, with a gentle breeze that made the hike even more enjoyable. We saw various wildlife including deer, squirrels, and many beautiful bird ",
  },
  {
    id: 3,
    title: "Learning Journey",
    content: "Short entry about learning new skills.",
  },
  {
    id: 1,
    title: "My Productive Morning",
    content:
      "Today was an incredibly productive morning that started with my usual 6 AM wake-up call. I immediately jumped out of bed feeling energized and ready to tackle the day ahead. After a quick stretch and some deep breathing exercises, I headed to the kitchen to prepare my favorite breakfast - oatmeal with fresh berries and a drizzle of honey. The combination of complex carbohydrates and natural sugars gave me the perfect energy boost I needed. While eating, I reviewed my daily goals and priorities, mentally organizing my tasks for maximum efficiency. The weather was perfect for my morning jog, so I laced up my running shoes and headed out for a 30-minute run through the neighborhood park. The fresh air and gentle exercise cleared my mind and boosted my mood significantly. Upon returning home, I took a refreshing shower and got dressed in my most comfortable work attire. I spent the next hour working on my most important project, making substantial progress that I'm really proud of. The morning flew by, and before I knew it, it was time for my first meeting of the day.",
  },
  {
    id: 2,
    title: "Weekend Adventures",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod totam molestiae consequatur odio et accusantium? Molestias laborum, quidem dicta tempora officia veritatis rem numquam magni culpa, fuga officiis impedit nesciunt! Enim harum inventore necessitatibus dolore numquam vero! Rerum nihil quibusdam error quas recusandae, deleniti sit ad eligendi sequi voluptatibus magnam beatae, pariatur veniam at, ea magni exercitationem quo? Ipsa, facilis.   Voluptatibus quae quisquam suscipit voluptate vel, consectetur ab numquam optio ipsa iusto quas possimus ipsam nostrum blanditiis, aut culpa eveniet? Quo beatae iusto tempora, temporibus tenetur aperiam doloribus laborum dolores! This weekend was filled with amazing adventures and memorable experiences that I'll cherish for years to come. Saturday morning started with a spontaneous decision to visit the local farmers market with my family. We discovered so many unique vendors selling everything from fresh produce to handmade crafts. I particularly enjoyed talking to the local honey farmer who explained the intricate process of beekeeping and let us sample different varieties of honey. We bought fresh strawberries, organic vegetables, and some delicious homemade bread that became the foundation for our weekend meals. Sunday was even more exciting as we decided to go hiking in the mountains. The trail was challenging but rewarding, offering breathtaking views of the valley below. We packed a picnic lunch and found the perfect spot to rest and enjoy our meal while taking in the spectacular scenery. The weather was absolutely perfect - sunny but not too hot, with a gentle breeze that made the hike even more enjoyable. We saw various wildlife including deer, squirrels, and many beautiful bird ",
  },
  {
    id: 3,
    title: "Learning Journey",
    content: "Short entry about learning new skills.",
  },
];

const JournalList = ({ isInputBoxOpen }) => {
  return (
    <div className={` ${styles.journalListContainer}`}>
      {isInputBoxOpen && <InputBox />}
      {sampleJournals.map((journal) => (
        <JournalCard
          key={journal.id}
          title={journal.title}
          content={journal.content}
        />
      ))}
    </div>
  );
};

export default JournalList;
