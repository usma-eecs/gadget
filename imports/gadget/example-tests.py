# All tests go in a tab/file named 'tests.py' as you see here.
# You typically want to make this a hidden file

# import the tests library
# you can see the source code for the tests library here:
# https://github.com/kylekyle/it105/blob/master/public/gadget/imports/gadget/tests.py
import gadget.tests as tests

# anything function that starts with "assert"
# adds a test to result screen on the right

# every test has a default test name and failure message, 
# but those can be customized by passing in name or message

# if students will be using the input function, then you 
# mock the input using the setInput helper
tests.setInput("2","2")

# assertImports(mod,name=None,message=None)
# passes if the user imports the given module
tests.assertImports("math")

# tests.assertNoErrors(name=None,message=None)
# passes if there are no errors when importing student code
tests.assertNoErrors()

# assertCallsFunction(func,name=None,message=None)
# passes if they call the given function
# functions can belong to modules, e.g. "math.cos"
# pass in "_.methodname" to assert that a method was called
# on an object instance, like a turtle (e.g. _.forward)
# you can pass an array if you want to check for aliases, 
# e.g. ["_.forward", "_.fd"]
tests.assertCallsFunction("input")
tests.assertCallsFunction("float")

# assertDoesNotCallFunction(func,name=None,message=None)
# this is useful if you want to stop cadets from using input 
tests.assertDoesNotCallFunction("raw_input")

# assertCodeMatches(pattern,name=None,message=None,flags=0)
# passes if the given pattern matches their code
import re # I need this for the flag below
tests.assertCodeMatches("^#\s*name", name="Name is at top of file", flags=re.IGNORECASE)

# assertCodePrints(pattern,name=None,message=None,flags=0)
# just like assertCodeMatches, but runs against the printed output
# since we set the inputs to "2" and "2", they should print 4
tests.assertCodePrints("Sum: 4.0")

# assertDefinesFunction(func,name=None,message=None)
tests.assertDefinesFunction("add")

# assertFunctionHasArity(func,arity,name=None,message=None)
# verifies the number of arguments a function takes
tests.assertFunctionHasArity("add", 2)

# assertCodePrints(pattern,name=None,message=None,flags=0)
# the pattern below can be used to verify nothing was printed
tests.assertFunctionPrints("^$", "add", [2, 2],
  name = "<tt>add</tt> prints nothing",
  message = "Your should return, not print"
)

# assertFunctionReturns(expected,func,args=[],name=None,message=None)
import random
a = random.randint(1,999)
b = random.randint(1,999)
tests.assertFunctionReturns(a+b, "add", [a,b])

# assertHasSyntaxNode(node,name=None,message=None)
# this assertion parses an abstract syntax tree for the code
# and returns true if the code contains the given node
# this could be accomplished using a regular expression, but 
# this method ensures that the node is found in a valid context,
# for example, outside of a comment block
# 
# see here for a list of all possible syntax nodes you can check for:
# https://docs.python.org/3/library/ast.html#abstract-grammar
tests.assertHasSyntaxNode("Return")

# Here is an example of a custom test using a function decorator
@tests.register(
  name="<tt>add</tt> returns a <tt>float</tt>",
  # the message is optional - it will be printed when the test fails
  message="Your <tt>add</tt> function returned an object of the wrong type",
  # these are functions that must pass before your test is run
  requires = [
    # make sure there are no errors in the code
    tests.requireNoErrors(), 
    # make sure the function exists and takes two arguments
    tests.requireFunctionHasArity("add", 2) 
  ]
)
# test functions receive the student code, the output of the program
# and any errors. all parameters are strings
def addReturnsFloat(code,output,error):
  import main # this is safe since we use requireNoErrors()
  # the capture helper is explained in detail below
  result,output,error = tests.capture(main.add,2,2)
  
  # return True if the test passed
  if type(result) is float:
    return True
  
  # return False if the test failed
  # return a String if the test failed and you want to provide the 
  # student with more information about the failure
  else:
    # tests.pretty is explained below
    return "Expected a float, received a " + tests.pretty(type(result))

# here is another custom function that uses a lambda instead of decorator
tests.register(
  name="Program is not too long", 
  message="Your program must be shorter than 10 lines",
  function=lambda code,output,error: len(code.splitlines())<=10
)

# any function that starts with "require" can be used in the 
# requires clause of a custom test

# tests.requireCallsFunction(func): requires that the student calls
#     the given function
# tests.requireDefinesFunction(func): requires that the student has defined the 
#     given function
# tests.requireFunctionHasArity(func,arity): requires that the student has defined
#     the given function that the function has the given arity (number of arguments) 
# tests.requireNoErrors(): requires that "import main" succeeds without error
# tests.requireValidSyntax(): requires that the code is syntactically valid

# there are a few helpers available in the tests library

# tests.setInput(*inputs): mocks standard input (i.e. what is returned by the input 
#     function)
# tests.capture(func,*args): takes a callable (lambda or function reference - NOT a 
#     a string) and arguments for the function. It returns the functions return value,
#     anything printed to standard output, and any errors in a list of strings (i.e. 
#     [ret,out,err])
# tests.pretty(): Takes an object (list,string,dict,etc) and returns a pretty string
#     representation of it

# if you're doing a turtle question, you'll need to disable the step drawing for the 
# test to run. Add this to every turtle tests.py for a turtle problem:

import turtle
turtle.tracer(0,0)

# finally, kick off the tests by calling tests.run()
# run takes an optional parameter, execute, which 
# can be set to False if you do not want to actually
# run the users code (like in the case of turtles)
tests.run()
# tests.run(execute=False)
