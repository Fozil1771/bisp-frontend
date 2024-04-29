import { Avatar } from "primereact/avatar"
import { Rating } from "primereact/rating"

const Reviews = ({ reviews }) => {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <h2 className="text-center text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Read trusted reviews from our customers
          </h2>

          <div className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">

            {reviews.map((review) => (
              <div className="mb-8 sm:break-inside-avoid">
                <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-4">
                    <Avatar
                      icon="pi pi-user"
                      image={review.reviewer.imageUrl ? `http://localhost:3003/public/profile/${review.reviewer.imageUrl}` : ''} size="xlarge" shape="circle" />

                    {/* <img
                      alt=""
                      src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                      className="size-14 rounded-full object-cover"
                    /> */}

                    <div>
                      <div className="flex justify-center gap-0.5 text-green-500">
                        <Rating value={review?.rating} className='text-amber-300' readOnly cancel={false} />
                      </div>

                      <p className="mt-0.5 text-lg font-medium text-gray-900">{review.reviewer.username}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-700">
                    {review.content}
                  </p>
                </blockquote>
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  )
}

export default Reviews