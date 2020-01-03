import { getFieldsWithDirectives } from '@graphql-modules/utils'
import {
  authenticated,
  validateRole,
} from './guards'

const DIRECTIVE_TO_GUARD = {
  auth: () => authenticated,
  protect: ({ role }) => validateRole(role),
}

export const resolversComposition = ({ typeDefs }) => {
  const fieldsAndTypeToDirectivesMap = getFieldsWithDirectives(typeDefs)

  let result = []
  for (const fieldPath in fieldsAndTypeToDirectivesMap) {
    const directives = fieldsAndTypeToDirectivesMap[fieldPath]

    if (directives.length < 0) continue

    result[fieldPath] = directives.map(directive => {
      if (!DIRECTIVE_TO_GUARD[directive.name]) return null

      return DIRECTIVE_TO_GUARD[directive.name](directive.args)
    }).filter(a => a)
  }

  return result
}
