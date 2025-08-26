# Shift Scheduler Widget - GitHub Copilot Instructions

**ALWAYS** follow these instructions first and only fallback to additional search and context gathering if the information here is incomplete or found to be in error.

## Working Effectively

### Bootstrap, Build, and Validate the Repository
- **Install dependencies**: `npm ci` -- takes ~15-50 seconds. NEVER CANCEL. Set timeout to 5+ minutes.
- **Lint the code**: `npm run lint` -- takes ~6 seconds. Note: TypeScript 5.8.3 warnings are expected and harmless.
- **Build the widget**: `npm run build` -- takes ~15 seconds. NEVER CANCEL. Set timeout to 5+ minutes for safety.
- **Fix linting issues**: `npm run lint:fix` -- takes ~15 seconds, auto-fixes formatting and style issues.

### Development Workflow
- **Start development server**: `npm run dev` -- starts file watcher with LiveReload on port 35730. NEVER CANCEL - runs continuously.
- **Import for testing**: Import the generated `dist/1.15.0/asml.ShiftScheduler.mpk` file into Mendix Studio Pro for testing.
- **Validate build output**: Check that `dist/1.15.0/asml.ShiftScheduler.mpk` exists and is ~423KB after build.

## Validation Requirements

### Build Validation
- **ALWAYS** run the complete build sequence after making changes:
  1. `npm run lint` -- must pass (TypeScript warnings are acceptable)
  2. `npm run build` -- must create .mpk file successfully
  3. Check `ls -lh dist/1.15.0/asml.ShiftScheduler.mpk` shows ~400KB file

### Manual Testing Scenarios
Since this is a Mendix widget, manual validation requires:
- **Widget Import**: Import the built .mpk file into Mendix Studio Pro
- **Basic Functionality**: Configure widget with sample People and Event entities
- **Core Features**: Test day-grid display, team grouping, event color coding
- **Interactions**: Verify double-click editing and right-click context menus work
- **Data Loading**: Confirm widget handles empty state, loading state, and error states

### Pre-Commit Validation
- **ALWAYS** run `npm run lint:fix` before committing changes
- **ALWAYS** run `npm run build` to ensure the widget builds successfully
- Build failure will cause CI pipeline (.github/workflows/ci.yml) to fail

## Repository Architecture

### Primary Widget Structure
- **Main entry**: `src/ShiftScheduler.tsx` - Widget container and Mendix integration
- **Core component**: `src/components/ScheduleGrid.tsx` - Main scheduling interface
- **Hook architecture**: `src/hooks/` - Modular data management and UI interaction hooks
- **Type definitions**: `src/types/shiftScheduler.ts` - TypeScript interfaces
- **Utilities**: `src/utils/` - Date helpers, data extraction, event processing

### Key Development Files
- `src/ShiftScheduler.tsx` - Widget entry point and Mendix integration
- `src/components/ScheduleGrid.tsx` - Core scheduling logic and day-grid layout
- `src/components/TeamSection.tsx` - Team grouping with capacity indicators
- `src/components/DayCell.tsx` - Individual day cells with event display
- `src/hooks/useEventData.ts` - Main data orchestration hook (516 lines)
- `src/types/shiftScheduler.ts` - Data model definitions

### Configuration Files
- **Widget definition**: `src/ShiftScheduler.xml` - Mendix widget configuration
- **Build config**: Uses `@mendix/pluggable-widgets-tools` (TypeScript, React 18)
- **Linting**: `.eslintrc.js` and `prettier.config.js` - Code quality rules

## Technology Stack

### Core Dependencies
- **React 18** with TypeScript for UI components
- **dayjs 1.11.13** for date manipulation
- **react-intersection-observer 9.16.0** for infinite scroll
- **Mendix Pluggable Widgets Tools 10.21.2** for build pipeline

### Platform Requirements
- **Node.js 20+** (validated on 20.19.4)
- **npm 10+** (validated on 10.8.2)
- **Mendix Studio Pro** for widget testing and deployment

## Common Tasks

### Adding New Features
- Follow component structure in `src/components/`
- Add new hooks in `src/hooks/` for complex state management
- Update TypeScript interfaces in `src/types/shiftScheduler.ts`
- Update CSS in `src/ui/ShiftScheduler.css`

### Data Integration
- Enhance Mendix entity handling in `src/ShiftScheduler.tsx`
- Update microflow specifications per `docs/MICROFLOW_SPECIFICATION.md`
- Follow action variables pattern (Mendix 10.24+) in `docs/MENDIX_10_18_COMPATIBILITY.md`

### Debug Information
- Enable debug panel with `showDebugInfo` widget property
- Debug panel shows microflow responses and data validation
- Use browser DevTools for React component debugging

## Testing Strategy

### No Unit Test Infrastructure
- **Current state**: No jest, vitest, cypress, or playwright tests exist
- **Validation approach**: Manual testing in Mendix Studio Pro environment
- **Quality assurance**: Relies on TypeScript, linting, and build validation

### Recommended Testing Approach
1. **Build validation**: Ensure `npm run build` succeeds
2. **Import testing**: Import .mpk into test Mendix project
3. **Functional testing**: Test core user scenarios in Mendix runtime
4. **Integration testing**: Verify microflow interactions work correctly

## Quick Command Reference

### Complete Development Workflow
```bash
# Clean start (if node_modules exists)
rm -rf node_modules/ dist/

# Install dependencies (~15 seconds)
npm ci

# Lint code (~6 seconds) 
npm run lint

# Build widget (~15 seconds)
npm run build

# Verify build output (~423KB)
ls -lh dist/1.15.0/asml.ShiftScheduler.mpk

# Start development server (runs continuously)
npm run dev
```

### Output from `ls -la` (repository root)
```
.eslintrc.js          - ESLint configuration
.gitignore            - Git ignore patterns
.github/              - GitHub Actions and workflows
.prettierignore       - Prettier ignore patterns
CHANGELOG.md          - Version history
CLAUDE.md             - Detailed development context
LICENSE               - Apache 2.0 license
README.md             - User documentation
dist/                 - Build output directory
docs/                 - Technical documentation
package.json          - Project configuration
prettier.config.js    - Prettier configuration
src/                  - Widget source code
tsconfig.json         - TypeScript configuration
typings/              - TypeScript type definitions
```

### Output from `cat package.json`
Key information:
- **Name**: "shiftscheduler"
- **Version**: "1.15.0"  
- **Description**: "A scheduler widget made for people working in shifts"
- **Node requirement**: ">=20"
- **License**: "Apache-2.0"
- **Main dependencies**: dayjs, react-intersection-observer
- **Dev tools**: @mendix/pluggable-widgets-tools ^10.21.2

### GitHub Actions (.github/workflows/ci.yml)
- **Trigger**: Pushes to main/develop, PRs to main/develop
- **Node versions**: Tests on Node 20 and 22
- **Steps**: npm ci → lint → build → bundle size check
- **Artifacts**: Uploads build artifacts for 30 days
- **Bundle reporting**: Comments on PRs with package size

### Build Expectations
- **Build time**: ~15 seconds (fast for a widget)
- **Bundle size**: ~400KB .mpk file
- **CI timeout**: Uses default timeouts (builds are fast)

## Documentation

### Essential Reading
- **Requirements**: `docs/USE_CASES.md` - Complete feature specification
- **Architecture**: `docs/SHIFT_SCHEDULER_DESIGN.md` - Design decisions
- **Data model**: `docs/MICROFLOW_SPECIFICATION.md` - Mendix integration
- **Migration**: `docs/MENDIX_10_18_COMPATIBILITY.md` - Action variables
- **Development**: `CLAUDE.md` - Detailed project context

### Quick Reference
- **README.md**: User-facing widget documentation and setup
- **CHANGELOG.md**: Version history and feature additions
- **ROADMAP.md**: Future feature planning and priorities

## Troubleshooting

### Common Issues
- **TypeScript warnings**: Version 5.8.3 warnings are expected, not errors
- **Build failures**: Usually due to syntax errors - check TypeScript compilation
- **Widget not loading**: Verify .mpk file was generated and is correct size
- **Development server issues**: Restart with `npm run dev` if file watching stops

### Performance Considerations
- Widget designed for 30-day data blocks with infinite scroll
- Team capacity indicators require proper microflow implementation
- Large datasets (500+ people) may need pagination strategies

---

*This widget is a Mendix pluggable widget specifically designed for 24/7 shift scheduling. Traditional "run the app" testing doesn't apply - validation requires importing into Mendix Studio Pro and testing within the Mendix platform.*