import type { Route } from "./+types/tasks";
import { useFetcher } from "react-router";
import { useLoaderData } from "react-router";
import { ROUTES } from "~/shared/route-path";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `Dev Soneru | ${data?.title}` },
    { name: "description", content: "Tasks Page - CRUD actions | Database - Supabase" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  let { data: tasks, error } = await context.supabaseClient.supabase.from('tasks')
    .select("*")

  if (error) {
    throw new Response("Not Found Tasks", { status: 404 });
  }

  return { title: 'TASKS PAGE', tasks };
}

export const action = async ({ request, context, params }: Route.ActionArgs) => {
  const method = await request.method;
  const { supabaseClient, session } = context;
  const userData = await session.getSession(request.headers.get("Cookie"));
  let result = null;
  try {
    switch (method) {
      case "POST": {
        const form = await request.formData();
        const title = form.get("title") as string;
        if (!title) {
          throw new Error("Title is required")
        }
        const { data, error } = await supabaseClient.supabase
          .from('tasks')
          .insert({
            title: title,
            user_id: userData.data.userId!
          }).select();

        if (error) {
          throw new Error(error.message)
        }

        result = data;
      }
      case "DELETE": {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) {
          break;
        }
        const { data, error } = await supabaseClient.supabase
          .from('tasks')
          .delete()
          .eq('id', id);

        if (error) {
          throw new Error(error.message)
        }

        result = data
      }
      default:
        break;
    }

    return { success: true, data: result };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unexpected error occurred during create task" };
  }
};

export default function Tasks({ loaderData }: Route.ComponentProps) {
  const { title, tasks } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <div className="py-4">
        <fetcher.Form method="POST" action={ROUTES.TASKS} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white shadow-sm"
              placeholder="Enter task title..."
            />
          </div>

          {fetcher?.data?.error && (
            <span className="w-full inline-block mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {fetcher?.data?.error}
            </span>
          )}

          {fetcher?.data?.success && (
            <span className="w-full inline-block mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              Task created successfully!
            </span>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={fetcher.state === "submitting"}
          >
            {fetcher.state === "submitting" ? "Creating..." : "Create Task"}
          </button>
        </fetcher.Form>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks?.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{task.title}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.completed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{new Date(task.created_at).toLocaleString()}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">
                  <fetcher.Form method="DELETE" action={`${ROUTES.TASKS}?id=${task.id}`} className="max-w-md">
                    <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-rose-700 text-white font-medium py-3 px-4 rounded-lg hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                      Remove It
                    </button>
                  </fetcher.Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
