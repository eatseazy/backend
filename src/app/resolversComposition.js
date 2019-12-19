import { getFieldsWithDirectives } from '@graphql-modules/utils'
import { authenticated } from './guards/authenticated'
import { validateRole } from './guards/validateRole'

const DIRECTIVE_TO_GUARD = {
  auth: () => authenticated,
  protect: ({ role }) => validateRole(role),
}

export const resolversComposition = ({ typeDefs }) => {
  const fieldsAndTypeToDirectivesMap = getFieldsWithDirectives(typeDefs)

  let result = []
  for (const fieldPath in fieldsAndTypeToDirectivesMap) {
    const directives = fieldsAndTypeToDirectivesMap[fieldPath]

    if (directives.length > 0) {
      result[fieldPath] = directives.map(directive => {
        if (DIRECTIVE_TO_GUARD[directive.name]) {
          const mapperFn =  DIRECTIVE_TO_GUARD[directive.name]

          return mapperFn(directive.args)
        }

        return null
      }).filter(a => a)
    }
  }

  return result
}
