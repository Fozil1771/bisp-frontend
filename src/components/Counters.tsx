const Counters = () => {
  return (
    <section className="py-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="md:border-r border-gray-300">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">70+</div>
              <p className="text-gray-600">Courses</p>
              <p className="text-gray-500 mt-2">
                From language courses to IT lectures
              </p>
            </div>
          </div>
          <div className="md:border-r border-gray-300">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">15+</div>
              <p className="text-gray-600">Professional Teachers</p>
              <p className="text-gray-500 mt-2">
                Tutors with professional experience and expertise
              </p>
            </div>
          </div>
          <div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">3</div>
              <p className="text-gray-600">Years</p>
              <p className="text-gray-500 mt-2">
                More than 3 years of experience in the market
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Counters;
