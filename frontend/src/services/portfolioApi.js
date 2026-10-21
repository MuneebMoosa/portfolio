import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
    credentials: "include",
  }),
  tagTypes: ["Project", "Skill", "Journey"],
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    
    getCurrentAdmin: builder.query({
      query: () => "/auth/me",
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    getProjects: builder.query({
      query: () => "/projects",
      providesTags: ["Project"],
    }),

    getSkills: builder.query({
      query: () => "/skills",
      providesTags: ["Skill"],
    }),

    getJourney: builder.query({
      query: () => "/journey",
      providesTags: ["Journey"],
    }),

    createProject: builder.mutation({
        query: (newProject) => ({
          url: "/projects",
          method: "POST",
          body: newProject,
        }),
        invalidatesTags: ["Project"],
      }),

    updateProject: builder.mutation({
      query: ({ id, ...updatedProject }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: updatedProject,
      }),
      invalidatesTags: ["Project"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
    createSkillCategory: builder.mutation({
      query: (category) => ({
        url: "/skills",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Skill"],
    }),

    updateSkillCategory: builder.mutation({
      query: ({ id, ...changes }) => ({
        url: `/skills/${id}`,
        method: "PATCH",
        body: changes,
      }),
      invalidatesTags: ["Skill"],
    }),

    deleteSkillCategory: builder.mutation({
      query: (id) => ({
        url: `/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skill"],
    }),

    addSkillItem: builder.mutation({
      query: ({ id, ...skill }) => ({
        url: `/skills/${id}/items`,
        method: "POST",
        body: skill,
      }),
      invalidatesTags: ["Skill"],
    }),

    updateSkillItem: builder.mutation({
      query: ({ id, skillName, ...changes }) => ({
        url: `/skills/${id}/items/${encodeURIComponent(skillName)}`,
        method: "PATCH",
        body: changes,
      }),
      invalidatesTags: ["Skill"],
    }),

    deleteSkillItem: builder.mutation({
      query: ({ id, skillName }) => ({
        url: `/skills/${id}/items/${encodeURIComponent(skillName)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skill"],
    }),

    createJourney: builder.mutation({
      query: (body) => ({
        url: "/journey",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Journey"],
    }),

    updateJourney: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/journey/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Journey"],
    }),

    deleteJourney: builder.mutation({
      query: (id) => ({
        url: `/journey/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Journey"],
    }),
  }),
});

export const { useGetProjectsQuery ,
   useGetSkillsQuery , 
   useGetJourneyQuery , 
   useCreateProjectMutation, 
   useUpdateProjectMutation, 
   useDeleteProjectMutation,
   useCreateSkillCategoryMutation,
   useUpdateSkillCategoryMutation,
   useDeleteSkillCategoryMutation,
   useAddSkillItemMutation,
   useUpdateSkillItemMutation,
   useDeleteSkillItemMutation, 
   useCreateJourneyMutation,
   useUpdateJourneyMutation,
   useDeleteJourneyMutation,
   useLoginMutation,
   useGetCurrentAdminQuery,
   useLogoutMutation,} = portfolioApi;
