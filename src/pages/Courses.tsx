import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import courseVideos from "@/data/courseVideos";

const courseKeys = Object.keys(courseVideos);

const Courses = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Browse <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-muted-foreground mt-2">Choose a category and start learning with video modules.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courseKeys.map((key, i) => {
            const course = courseVideos[key];
            const totalModules = course.subCourses.reduce((s, sc) => s + sc.modules.length, 0);
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/courses/${key}`}
                  className="block bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all group h-full"
                >
                  <span className="text-5xl mb-4 block">{course.icon}</span>
                  <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {course.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{course.subCourses.length} sub-courses</span>
                    <span>•</span>
                    <span>{totalModules} modules</span>
                  </div>
                  <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${course.color} w-1/3 group-hover:w-2/3 transition-all`} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
