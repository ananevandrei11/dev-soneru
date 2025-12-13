import type { Route } from "./+types/tasks";
import { redirect, useFetcher, type ActionFunction, type AppLoadContext } from "react-router";
import { useLoaderData } from "react-router";
import { ROUTES } from "~/shared/route-path";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `Dev Soneru | ${data?.title}` },
    { name: "description", content: "Tasks Page - CRUD actions | Database - Supabase" },
  ];
}

export async function loader({ request, context }: Route.LoaderArgs) {
  let { data: tasks, error } = await context.supabaseClient.supabase.from('tasks')
    .select("*")

  if (error) {
    throw new Response("Not Found Tasks", { status: 404 });
  }

  return { title: 'TASKS PAGE', tasks };
}

/*
export const action: ActionFunction<AppLoadContext> = async ({ request, context }) => {
  try {
    const { supabaseClient, session } = context;
    const userData = await session.getSession(request.headers.get("Cookie"));

    const { data, error } = await supabaseClient.supabase
      .from('tasks')
      .insert({
        title: 'title',
        user_id: userData.data.userId!
      }).select();

    return { success: true, data }
  } catch (error) {
    console.error("Login error:", JSON.stringify(error, null, 2));
    return { error: error instanceof Error ? error.message : "An unexpected error occurred during login" };
  }
};
*/

export default function Tasks({ loaderData }: Route.ComponentProps) {
  const { title, tasks } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
