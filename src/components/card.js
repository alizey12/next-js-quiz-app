

export default function Card() {
    return(
        <div className="bg-gradient-to-r from-gray-400 to-pink-800">
            <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="shadow-lg bg-rose-900 shadow-lg shadow-pink-500/80  text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Quiz</h1>

          <div className="mb-4">
            <p className="text-lg font-semibold">Smyths Sea can be found on which body in the Solar System?</p>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input type="radio" name="q1" value="a" className="mr-2" />
                <span className="text-white">The Sun</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="q1" value="b" className="mr-2" />
                <span className="text-white">The Moon</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="q1" value="c" className="mr-2" />
                <span className="text-white">Mars</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="q1" value="d" className="mr-2" />
                <span className="text-white">Earth</span>
              </label>
            </div>
          </div>

          

          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Submit</button>
        </div>
      </div>
    </div>
        </div>
    );
}