import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import app from "../../../database/firebase";

function AdvertismentTable({ data, handle }) {
  console.log(data);

  const handleEdit = (id) => {
    console.log("Edit clicked", id);
    handle(id);
  };

  const handleDelte = async (id) => {
    const db = getFirestore(app);
    try {
      const docRef = doc(db, "AdvertisementPlans", id);
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
      window.location.reload();
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Ad name
            </th>
            <th scope="col" className="px-6 py-3">
              placement
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>

            <th scope="col" className="px-6 py-3">
              PriceType
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>

            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-search-1" class="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.title}
              </th>
              <td class="px-6 py-4">{item.placement}</td>
              <td class="px-6 py-4">{item.type}</td>
              <td class="px-6 py-4">{item.pricetype}</td>
              <td class="px-6 py-4">${item.price}</td>

              <td class="flex items-center px-6 py-4">
                <button
                  onClick={() => handleEdit(item.AdId)}
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelte(item.AdId)}
                  class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdvertismentTable;
