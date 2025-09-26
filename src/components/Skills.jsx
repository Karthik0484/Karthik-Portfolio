import React from 'react';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, 
  FaBootstrap, FaGithub, FaGitAlt, FaPython, FaDatabase
} from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb, SiFlask, 
  SiPandas, SiNumpy, SiScikitlearn, SiVisualstudiocode 
} from 'react-icons/si';

const Skills = () => {
  // Skill categories with their respective skills and icons
  const categories = [
    {
      name: 'Frontend',
      icon: '🌐',
      skills: [
        { name: 'HTML5', icon: <FaHtml5 />, color: 'orange-500' },
        { name: 'CSS3', icon: <FaCss3Alt />, color: 'blue-500' },
        { name: 'JavaScript', icon: <FaJs />, color: 'yellow-400' },
        { name: 'React', icon: <FaReact />, color: 'blue-500' },
        { name: 'Tailwind', icon: <SiTailwindcss />, color: 'cyan-400' },
        { name: 'Bootstrap', icon: <FaBootstrap />, color: 'purple-600' },
      ]
    },
    {
      name: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs />, color: 'green-600' },
        { name: 'Express', icon: <SiExpress />, color: 'gray-500' },
        { name: 'Flask', icon: <SiFlask />, color: 'gray-700' },
        { name: 'MongoDB', icon: <SiMongodb />, color: 'green-500' },
        { name: 'RESTful APIs', icon: '🔌', color: 'blue-400' },
        { name: 'JWT Auth', icon: '🔑', color: 'purple-500' },
      ]
    },
    {
      name: 'AI/ML',
      icon: '🤖',
      skills: [
        { name: 'Python', icon: <FaPython />, color: 'yellow-500' },
        { name: 'Pandas', icon: <SiPandas />, color: 'blue-700' },
        { name: 'NumPy', icon: <SiNumpy />, color: 'indigo-500' },
        { name: 'Scikit-learn', icon: <SiScikitlearn />, color: 'orange-400' },
        { name: 'TensorFlow', icon: '🧠', color: 'orange-500' },
        { name: 'NLTK', icon: '📚', color: 'green-400' },
      ]
    },
    {
      name: 'Tools',
      icon: '🛠️',
      skills: [
        { name: 'Git', icon: <FaGitAlt />, color: 'orange-600' },
        { name: 'GitHub', icon: <FaGithub />, color: 'gray-800' },
        { name: 'VS Code', icon: <SiVisualstudiocode />, color: 'blue-600' },
        { name: 'Postman', icon: '📡', color: 'orange-500' },
        { name: 'Figma', icon: '🎨', color: 'pink-500' },
        { name: 'Docker', icon: '🐳', color: 'blue-400' },
      ]
    }
  ];

  return (
    <section id="skills" className="w-full px-4 py-16 md:px-8 lg:px-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <h4 className="text-center mb-2 text-lg font-Ovo text-purple-600 dark:text-purple-400">
          My Technical Skills
        </h4>
        <h2 className="text-center text-4xl md:text-5xl font-Ovo mb-4">
          💡 My Skills
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 font-Ovo">
          I've worked with a variety of technologies in the web development world, from front-end to back-end and AI/ML. Here's a quick overview of my technical skills.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <span className="text-xl">{category.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {category.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className={`
                      px-3 py-1.5 text-sm font-medium rounded-full 
                      transition-all duration-200 flex items-center gap-1.5
                      bg-${skill.color}/10 text-${skill.color} dark:bg-${skill.color}/20 dark:text-${skill.color}/90
                      hover:scale-105 hover:shadow-md hover:shadow-${skill.color}/20
                      border border-${skill.color}/20 dark:border-${skill.color}/30
                    `}
                  >
                    <span className="text-base">{skill.icon}</span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
